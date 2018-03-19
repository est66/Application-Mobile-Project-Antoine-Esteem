import { User } from "./user";
import { issueType } from "./issueType";

export class Issue {
    assigneeHref: string;
    createdAt: Date;
    creatorHref: string;
    description: string;
    href: string;
    id: string;
    imageUrl: string;
    additionalImageUrls: [string];
    issueTypeHref: string;
    location: {
      coordinates: [
        number,
        number
      ],
      type: string
    };
    state: string;
    tags: [string];
    updatedAt: Date;
    creator: User;
    issueType: issueType;
}


