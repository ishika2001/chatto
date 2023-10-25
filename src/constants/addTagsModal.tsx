export interface FieldConfig {
    label: string;
    name: string;
    type: string;
    case_className: string;
    detail_className: string;
    options?: { value: string; label: string }[];
    validation?: {
      required: boolean;
      errorMessage: string;
    };
  }

export const fieldConfigs: FieldConfig[][] = [
    [
      {
        label: "Tag",
        name: "tag",
        type: "Select",
       
        options: [
          { value: "Tag1", label: "Tag1" },
          { value: "Tag2", label: "Tag2" },
          { value: "Tag3", label: "Tag3" },
          { value: "Tag4", label: "Tag4" },
        ],
        case_className: "col-md-6",
        detail_className: "col-lg-12 we",
        validation: {
          required: true,
          errorMessage: "Tag is required.",
        },
      },
      {
        label: "Title",
        name: "title",
        type: "text",
        case_className: "col-md-6",
        detail_className: "col-md-6",
        validation: {
          required: true,
          errorMessage: "Title is required.",
        },
      },
     
    ],
    [
      {
        label: "Details",
        name: "details",
        type: "text",
        case_className: "col-md-6",
        detail_className: "col-md-6",
        validation: {
          required: true,
          errorMessage: "Detail is required.",
        },
      },
      {
        label: "Status",
        name: "status",
        type: "Select",
        case_className: "col-md-6",
        detail_className: "col-md-6  ",
        options: [
          { value: "True", label: "True" },
          { value: "False", label: "False" },
        ],
        validation: {
          required: true,
          errorMessage: "Status is required.",
        },
      },     
    ],
    [
      {
        label: "Created At",
        name: "createdAt",
        type: "datetime-local",
        case_className: "col-md-6",
        detail_className: "col-md-12  hidden",
        validation: {
          required: true,
          errorMessage: "Created Date is required.",
        },
      },
      {
        label: "Expired At",
        name: "expired_at",
        type: "datetime-local",
        case_className: "col-md-6",
        detail_className: "col-md-12  hidden", 
        validation: {
          required: true,
          errorMessage: "Expired Date is required.",
        },
      },
      
    ],
  ];
