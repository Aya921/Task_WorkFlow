import { FONT_STYLES } from "../../../../../assets/fonts/font_style";
import { getInitials } from "../../utils/get_initials";
import type { WorkspaceMember } from "../../../domain/entity/workspace_member";

type SuggestionCardProps = {
    text: string;
    workspaceMember?: WorkspaceMember;
    isExternal: boolean;
   
    onSelect?: (member: WorkspaceMember) => void;
    onSelectExternal?: (suggestion: string) => void;
}
export const SuggestionCard = ({ text, workspaceMember, isExternal, onSelect, onSelectExternal }: SuggestionCardProps) => {
    return(
       
        <li key={text}>
          <button
            type="button"
            onClick={() => isExternal ? onSelectExternal?.(text) : onSelect?.(workspaceMember!)}
            className="flex w-full items-center gap-2 px-2.5 py-1.5 text-start transition-colors hover:bg-secondary-50"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-[9px] font-semibold text-primary-700">
              {getInitials(text)}
            </span>
            <span className="min-w-0 flex-1">
              <span
                className={`${FONT_STYLES.caption} block truncate font-medium text-secondary-900`}
              >
                {text}
              </span>
             
            </span>
           {isExternal && (
            <span className="p-2 border border-blue-100 rounded-md text-[">
              <p className={`${FONT_STYLES.caption} font-medium text-blue-500`}>External Member</p>
            </span>
           )}
            {workspaceMember?.email ? (
                <span className="block truncate text-[10px] text-secondary-400">
                  {workspaceMember?.email}
                </span>
              ) : null}
          </button>
        </li>
   

    )
}