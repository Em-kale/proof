// This is an auto-generated file, do not edit manually
export const definition = {
  models: {
    Attestation: {
      id: "kjzl6hvfrbw6c543jd5h0jgniefi9mulm0fvzzat1astyex1qfa2jmrrwmrjxrd",
      accountRelation: { type: "list" },
    },
    Checklist: {
      id: "kjzl6hvfrbw6c8q77wphjs2v4migq9tbcbtnxw09o2sxu881wv2wuiithm9i14m",
      accountRelation: { type: "list" },
    },
    ChecklistItem: {
      id: "kjzl6hvfrbw6c6q7g168kb2rx4ipd9xd5jz3nv6j3ku0j5ycr5otq55faewb2qv",
      accountRelation: { type: "list" },
    },
  },
  objects: {
    Attestation: {
      itemId: { type: "string", required: true },
      checklistId: { type: "string", required: true },
      attestationId: { type: "string", required: true },
      attestationDate: { type: "string", required: true },
      attestorAccount: { type: "string", required: true },
      attestationRemark: { type: "string", required: false },
      attestationStatus: { type: "string", required: true },
      masterChecklistId: { type: "string", required: true },
      attestationForAccount: { type: "string", required: true },
    },
    Checklist: {
      child: { type: "did", required: true },
      endDate: { type: "string", required: false },
      assignTo: {
        type: "list",
        required: false,
        item: { type: "string", required: false },
      },
      startDate: { type: "string", required: false },
      pocAccount: { type: "string", required: false },
      checklistId: { type: "string", required: true },
      activeStatus: { type: "string", required: true },
      organization: { type: "string", required: false },
      checklistName: { type: "string", required: true },
      assignedToAccount: { type: "string", required: false },
      masterChecklistId: { type: "string", required: true },
      accountableOwnerAccount: { type: "string", required: false },
      checklistCreatorAccount: { type: "string", required: true },
    },
    ChecklistItem: {
      itemStart: { type: "string", required: false },
      itemTitle: { type: "string", required: true },
      checklistId: { type: "streamid", required: true },
      itemDeadline: { type: "string", required: false },
      itemCompleted: { type: "boolean", required: true },
      itemDescription: { type: "string", required: false },
      itemAttestationId: { type: "string", required: false },
      itemCompletionDate: { type: "string", required: false },
      itemAttestationReceived: { type: "boolean", required: false },
      itemAttestationRequired: { type: "boolean", required: true },
      itemAuthorizedAttestors: {
        type: "list",
        required: false,
        item: { type: "string", required: false },
      },
      itemAttestationRequested: { type: "string", required: false },
      itemAttestationDateReceived: { type: "string", required: false },
      itemDateAttestationRequested: { type: "string", required: false },
      itemAttestationRequestedFromAccount: { type: "string", required: false },
      checklist: {
        type: "view",
        viewType: "relation",
        relation: {
          source: "document",
          model:
            "kjzl6hvfrbw6c8q77wphjs2v4migq9tbcbtnxw09o2sxu881wv2wuiithm9i14m",
          property: "checklistId",
        },
      },
    },
  },
  enums: {},
  accountData: {
    attestationList: { type: "connection", name: "Attestation" },
    checklistList: { type: "connection", name: "Checklist" },
    checklistItemList: { type: "connection", name: "ChecklistItem" },
  },
};
