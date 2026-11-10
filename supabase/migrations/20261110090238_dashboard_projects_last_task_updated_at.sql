CREATE OR REPLACE FUNCTION public.get_workspace_dashboard(p_workspace_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_result jsonb;
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF NOT public.is_workspace_member(p_workspace_id) THEN
    RAISE EXCEPTION 'Not authorized to access this workspace';
  END IF;

  WITH workspace_projects AS (
    SELECT
      p.id,
      p.name,
      p.description,
      p.color,
      p.status,
      p.created_at
    FROM public.projects p
    WHERE p.workspace_id = p_workspace_id
  ),
  task_stats AS (
    SELECT
      t.project_id,
      count(*)::integer AS total_tasks,
      count(*) FILTER (WHERE t.status = 'done')::integer AS completed_tasks,
      count(*) FILTER (WHERE t.status = 'in_progress')::integer AS in_progress_tasks,
      count(*) FILTER (
        WHERE t.due_date IS NOT NULL
          AND t.due_date < now()
          AND t.status <> 'done'
      )::integer AS overdue_tasks,
      max(t.updated_at) AS last_task_updated_at
    FROM public.tasks t
    INNER JOIN workspace_projects wp ON wp.id = t.project_id
    GROUP BY t.project_id
  ),
  metrics AS (
    SELECT
      coalesce(sum(ts.total_tasks), 0)::integer AS total_tasks,
      coalesce(sum(ts.in_progress_tasks), 0)::integer AS in_progress,
      coalesce(sum(ts.completed_tasks), 0)::integer AS completed,
      coalesce(sum(ts.overdue_tasks), 0)::integer AS overdue
    FROM task_stats ts
  ),
  project_members_agg AS (
    SELECT
      pm.project_id,
      count(*)::integer AS members_count,
      coalesce(
        jsonb_agg(
          jsonb_build_object(
            'id', pr.id,
            'fullName', pr.full_name
          )
          ORDER BY pr.full_name, pr.id
        ),
        '[]'::jsonb
      ) AS members
    FROM public.project_members pm
    INNER JOIN workspace_projects wp ON wp.id = pm.project_id
    INNER JOIN public.profiles pr ON pr.id = pm.user_id
    GROUP BY pm.project_id
  ),
  projects_json AS (
    SELECT
      coalesce(
        jsonb_agg(
          jsonb_build_object(
            'id', wp.id,
            'name', wp.name,
            'description', wp.description,
            'color', wp.color,
            'status', wp.status,
            'progress', CASE
              WHEN coalesce(ts.total_tasks, 0) = 0 THEN 0
              ELSE round(
                (coalesce(ts.completed_tasks, 0)::numeric
                  / ts.total_tasks::numeric) * 100
              )::integer
            END,
            'totalTasks', coalesce(ts.total_tasks, 0),
            'completedTasks', coalesce(ts.completed_tasks, 0),
            'membersCount', coalesce(pma.members_count, 0),
            'members', coalesce(pma.members, '[]'::jsonb),
            'lastTaskUpdatedAt', ts.last_task_updated_at
          )
          ORDER BY wp.created_at DESC, wp.name, wp.id
        ),
        '[]'::jsonb
      ) AS projects
    FROM workspace_projects wp
    LEFT JOIN task_stats ts ON ts.project_id = wp.id
    LEFT JOIN project_members_agg pma ON pma.project_id = wp.id
  ),
  recent_tasks AS (
    SELECT
      coalesce(
        jsonb_agg(ranked.task_row ORDER BY ranked.ord),
        '[]'::jsonb
      ) AS recent
    FROM (
      SELECT
        jsonb_build_object(
          'id', t.id,
          'title', t.title,
          'status', t.status,
          'priority', t.priority,
          'dueDate', t.due_date,
          'updatedAt', t.updated_at,
          'projectId', t.project_id,
          'projectName', p.name,
          'assignedTo', t.assigned_to,
          'assignee', CASE
            WHEN pr.id IS NULL THEN NULL
            ELSE jsonb_build_object(
              'id', pr.id,
              'fullName', pr.full_name
            )
          END
        ) AS task_row,
        row_number() OVER (ORDER BY t.updated_at DESC, t.id DESC) AS ord
      FROM public.tasks t
      INNER JOIN public.projects p ON p.id = t.project_id
      LEFT JOIN public.profiles pr ON pr.id = t.assigned_to
      WHERE p.workspace_id = p_workspace_id
      ORDER BY t.updated_at DESC, t.id DESC
      LIMIT 5
    ) ranked
  )
  SELECT jsonb_build_object(
    'metrics', jsonb_build_object(
      'totalTasks', m.total_tasks,
      'inProgress', m.in_progress,
      'completed', m.completed,
      'overdue', m.overdue
    ),
    'projects', pj.projects,
    'recentTasks', rt.recent
  )
  INTO v_result
  FROM metrics m
  CROSS JOIN projects_json pj
  CROSS JOIN recent_tasks rt;

  RETURN coalesce(
    v_result,
    jsonb_build_object(
      'metrics', jsonb_build_object(
        'totalTasks', 0,
        'inProgress', 0,
        'completed', 0,
        'overdue', 0
      ),
      'projects', '[]'::jsonb,
      'recentTasks', '[]'::jsonb
    )
  );
END;
$$;

REVOKE ALL ON FUNCTION public.get_workspace_dashboard(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_workspace_dashboard(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.get_workspace_dashboard(uuid) TO authenticated;
