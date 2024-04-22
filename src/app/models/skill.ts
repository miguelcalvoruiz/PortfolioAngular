import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

export class Skill {
    name!: string;
    years!: string;
    icon!: IconName;
    iconType!: IconPrefix;
}

export class SkillGroup {
    group!: string;
    skills!: Skill[];
}
