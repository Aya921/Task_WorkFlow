import { Check, HousePlus, UserPlus } from "lucide-react";
import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { IconContainer } from "../../../../../shared/components/icon_container";
import { useState } from "react";
import { WorkspaceOptionCard } from "../components/workspace/workspace_option_card";

export const CreateWorkSpacePage = () => {
  const [createWorkSpace, setCreateWordSpace] = useState<boolean>(false);
  const [joinWorkSpace, setJoinWordSpace] = useState<boolean>(false);

  return (
    <div className="w-full flex flex-col items-center gap-10 ">
      <div className="flex flex-col items-center justify-center ">
        <p className={`${FONT_STYLES.h1}`}>Setup your workspace</p>
        <p className={`${FONT_STYLES.bodyLg}`}>
          Create a new hub for your team or join an existing one to get started.
        </p>
      </div>

      <div className="flex gap-15 ">
        <WorkspaceOptionCard
          title="Create New"
          description="Start fresh with a brand new workspace for your organization."
          icon={HousePlus}
          selected={createWorkSpace}
          
          onClick={() => {
            setCreateWordSpace(true);
            setJoinWordSpace(false);
          }}
        />

        <WorkspaceOptionCard
          title="Join Existing"
          description="Got an invite code? Join your team's current workspace."
          icon={UserPlus}
         variant="rose"
          selected={joinWorkSpace}
          onClick={() => {
            setJoinWordSpace(true);
            setCreateWordSpace(false);
          }}
        />
      </div>
    </div>
  );
};
