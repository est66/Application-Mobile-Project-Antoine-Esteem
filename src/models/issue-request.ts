export class IssueRequest {
    description : string;
    imageUrl: string;
    issueTypeHref : string;
    location: {
        coordinates : number[],
        type : string
    };
    state: string;  
    tags: string[];
    creator: string;
}