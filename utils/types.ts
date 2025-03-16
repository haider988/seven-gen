export interface Template {
  name: string;
  slug: string;
  icon: string;
  desc: string;
  category: string;
  aiPrompt: string;
  form: Form[];
}

export interface Form {
  label: string;
  field: string;
  name: string;
  required: boolean;
}


export interface QueryRecord {
    _id: string;
    template: any;
    email: string;
    query: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }