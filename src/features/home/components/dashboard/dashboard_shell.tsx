import { useLayoutEffect, useRef } from "react";
import { Bell, BriefcaseBusiness, CheckCheck, ChevronDown, Plus, Search, Sparkles, Users, MoreHorizontal, CalendarClock, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { StatCard } from "./stat_card";
import { TaskRow } from "./task_row";
import { QuickActionCard } from "./quick_action_card";
import { ActivityItem } from "./activity_item";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    title: "Total Tasks",
    value: 128,
    suffix: "",
    trend: 18,
    subtitle: "vs last week",
    accent: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
    icon: BriefcaseBusiness,
  },
  {
    title: "Completed",
    value: 84,
    suffix: "",
    trend: 12,
    subtitle: "this month",
    accent: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
    icon: CheckCheck,
  },
  {
    title: "In Progress",
    value: 26,
    suffix: "",
    trend: 9,
    subtitle: "active sprint",
    accent: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)",
    icon: Sparkles,
  },
  {
    title: "Team Members",
    value: 18,
    suffix: "",
    trend: 5,
    subtitle: "in workspace",
    accent: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
    icon: Users,
  },
];

const tasks = [
  {
    title: "Design onboarding flow",
    status: "In Progress" as const,
    priority: "High" as const,
    dueDate: "Today, 4:00 PM",
    assignee: "Maya",
    initials: "MY",
    accent: "linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)",
    icon: Sparkles,
  },
  {
    title: "API integration sprint",
    status: "Review" as const,
    priority: "Medium" as const,
    dueDate: "Thu, 2:30 PM",
    assignee: "Daniel",
    initials: "DA",
    accent: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)",
    icon: BriefcaseBusiness,
  },
  {
    title: "Bug bash checklist",
    status: "Done" as const,
    priority: "Low" as const,
    dueDate: "Completed",
    assignee: "Nora",
    initials: "NO",
    accent: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
    icon: CheckCheck,
  },
  {
    title: "Marketing launch plan",
    status: "Blocked" as const,
    priority: "High" as const,
    dueDate: "Mon, 11:00 AM",
    assignee: "Ava",
    initials: "AV",
    accent: "linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)",
    icon: CalendarClock,
  },
];

const upcoming = [
  { title: "Mobile QA round", dueDate: "Today • 4:30 PM", priority: "High", countdown: "2h left" },
  { title: "Sprint retrospective", dueDate: "Tomorrow • 9:00 AM", priority: "Medium", countdown: "18h left" },
  { title: "Client kickoff deck", dueDate: "Wed • 1:00 PM", priority: "Low", countdown: "36h left" },
];

const activity = [
  { title: "Ava created a new onboarding task", time: "12 minutes ago", accent: "linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)", icon: Plus },
  { title: "Maya completed the design review", time: "1 hour ago", accent: "linear-gradient(135deg, #10b981 0%, #34d399 100%)", icon: CheckCheck },
  { title: "Daniel joined the product workspace", time: "3 hours ago", accent: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)", icon: Users },
  { title: "Nora updated campaign milestones", time: "Yesterday", accent: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)", icon: MoreHorizontal },
];

const quickActions = [
  { title: "Create Task", description: "Start a new item and assign it instantly.", icon: Plus, accent: "linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)" },
  { title: "Create Workspace", description: "Organize projects, teams, and goals.", icon: BriefcaseBusiness, accent: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)" },
  { title: "Invite Team", description: "Bring collaborators into your workflow.", icon: Users, accent: "linear-gradient(135deg, #10b981 0%, #34d399 100%)" },
  { title: "View Reports", description: "Track delivery and team performance.", icon: ArrowUpRight, accent: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)" },
];

export const DashboardShell = () => {
  const dashboardRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from("[data-animate='header-item']", {
        opacity: 0,
        y: -16,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
      })
        .from(
          "[data-animate='card']",
          {
            opacity: 0,
            y: 30,
            stagger: 0.12,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.3",
        );

      gsap.utils.toArray<HTMLElement>("[data-animate='reveal']").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
            },
          },
        );
      });
    }, dashboardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={dashboardRef} className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-[28px] border border-slate-200 bg-white/80 px-4 py-4 shadow-[0_22px_52px_-30px_rgba(37,99,235,0.35)] backdrop-blur-xl sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3" data-animate="header-item">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-violet-500 text-lg font-bold text-white shadow-lg shadow-blue-500/25">
                T
              </div>
              <div>
                <p className="text-sm text-slate-500">Welcome back</p>
                <h1 className="text-xl font-semibold text-slate-900">Ava Johnson</h1>
              </div>
            </div>

            <div className="flex flex-1 items-center justify-center px-0 lg:px-6" data-animate="header-item">
              <div className="flex w-full max-w-xl items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 shadow-inner shadow-slate-100">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search tasks, people, or notes"
                  className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-3" data-animate="header-item">
              <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-600 transition-colors hover:border-slate-300 hover:bg-white">
                <Bell className="h-4 w-4" />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  3
                </span>
              </button>

              <button className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-white">
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-violet-500 text-xs font-semibold text-white">
                  DT
                </span>
                Design Team
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>

              <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-primary-600 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-500/20 transition-transform duration-200 hover:-translate-y-0.5">
                <Plus className="h-4 w-4" />
                Quick Create
              </button>
            </div>
          </div>
        </header>

        <main className="mt-8 space-y-8">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.title} data-animate="card">
                <StatCard {...stat} />
              </div>
            ))}
          </section>

          <section className="grid gap-8 xl:grid-cols-[1.7fr_0.95fr]">
            <div data-animate="reveal" className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_22px_55px_-30px_rgba(15,23,42,0.25)] sm:p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">Overview</p>
                  <h2 className="mt-1 text-xl font-semibold text-slate-900">Recent Tasks</h2>
                </div>
                <button className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50">
                  This Week
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-[0.12em] text-slate-400">
                      <th className="px-4 pb-3 font-medium">Task</th>
                      <th className="px-4 pb-3 font-medium">Status</th>
                      <th className="px-4 pb-3 font-medium">Priority</th>
                      <th className="px-4 pb-3 font-medium">Due date</th>
                      <th className="px-4 pb-3 font-medium">Assignee</th>
                      <th className="px-4 pb-3 text-right font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task) => (
                      <TaskRow key={task.title} {...task} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div data-animate="reveal" className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-950 to-primary-950 p-5 text-white shadow-[0_26px_60px_-30px_rgba(37,99,235,0.5)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-300">Productivity</p>
                  <h2 className="mt-1 text-xl font-semibold">This week</h2>
                </div>
                <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-emerald-300">
                  +18.4%
                </span>
              </div>

              <div className="mt-6 flex gap-3">
                <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-slate-300">Completed</p>
                  <p className="mt-2 text-3xl font-semibold">64%</p>
                </div>
                <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-slate-300">Pending</p>
                  <p className="mt-2 text-3xl font-semibold">36%</p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[48, 64, 58, 76, 88, 92].map((value, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="w-8 text-xs text-slate-400">{["M", "T", "W", "T", "F", "S"][index]}</span>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-8 xl:grid-cols-[0.95fr_1.5fr_1.2fr]">
            <div data-animate="reveal" className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_22px_55px_-30px_rgba(15,23,42,0.25)]">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Upcoming Deadlines</h3>
                <span className="text-xs text-slate-500">Next 3 tasks</span>
              </div>

              <div className="space-y-4">
                {upcoming.map((item, index) => (
                  <div key={item.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                        <p className="mt-1 text-xs text-slate-500">{item.dueDate}</p>
                      </div>
                      <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${item.priority === "High" ? "bg-rose-50 text-rose-700" : item.priority === "Medium" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
                        {item.priority}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200">
                        <div className="h-full rounded-full bg-gradient-to-r from-primary-500 to-violet-500" style={{ width: `${72 - index * 12}%` }} />
                      </div>
                      <span className="ml-3 text-xs font-medium text-slate-500">{item.countdown}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div data-animate="reveal" className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_22px_55px_-30px_rgba(15,23,42,0.25)]">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Team Activity</h3>
                <button className="text-xs font-medium text-primary-600">View all</button>
              </div>

              <div className="space-y-2">
                {activity.map((item) => (
                  <ActivityItem key={item.title} {...item} />
                ))}
              </div>
            </div>

            <div data-animate="reveal" className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_22px_55px_-30px_rgba(15,23,42,0.25)]">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Quick Actions</h3>
              </div>

              <div className="grid gap-3">
                {quickActions.map((action) => (
                  <QuickActionCard key={action.title} {...action} />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
