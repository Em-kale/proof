import { NearBindgen, LookupMap, near, call, AccountId } from 'near-sdk-js';

class ChildChecklist {
  creator_account: AccountId;
  checklist_id: string;
  
  constructor(creator_account: AccountId, checklist_id: string) {
    this.creator_account = creator_account,
    this.checklist_id = checklist_id;
  }
}

class MasterChecklist {
  creator_account: AccountId;
  master_checklist_id: string;

  constructor(creator_account: AccountId, master_checklist_id: string){
    this.creator_account = creator_account;
    this.master_checklist_id = master_checklist_id;
  }
}

@NearBindgen({})
export class Checklists {
  assignedChecklist: LookupMap<ChildChecklist>;
  createdChecklist: LookupMap<MasterChecklist>;

  constructor() {
    this.assignedChecklist = new LookupMap<ChildChecklist>("a");
    this.createdChecklist = new LookupMap<MasterChecklist>("b");
  }

  @call({})
  assignChecklist({ checklist_id, creator_account_id }: {checklist_id: string, creator_account_id: AccountId }) {
    const checklist = new ChildChecklist(creator_account_id, checklist_id)
    this.assignedChecklist.set(creator_account_id, checklist)
    near.log(`{"EVENT_JSON":{
      "standard":"nep171",
      "version":"1.0.0",
      "event":"assign_checklist",
      "data":{
        "creatorAccount":"${creator_account_id}",
        "checklistId":"${checklist_id}",
        "time":"${near.blockTimestamp()}",
      }}}`)
      return true
  }

  @call({})
  createChecklist({ master_checklist_id, creator_account_id }: {master_checklist_id: string, creator_account_id: AccountId}) {
    const masterChecklist = new MasterChecklist(creator_account_id, master_checklist_id)
    this.createdChecklist.set(creator_account_id, masterChecklist)
    near.log(`{"EVENT_JSON":{
      "standard":"nep171",
      "version":"1.0.0",
      "event":"create_checklist",
      "data":{
        "creatorAccount":"${creator_account_id}",
        "masterChecklistId":"${master_checklist_id}",
        "time":"${near.blockTimestamp()}",
      }}}`)
    return true
  }

  @call({})
  unassignChecklist({ checklist_id, creator_account_id }: { checklist_id: string, creator_account_id: AccountId }) {
    near.log(`{"EVENT_JSON":{
      "standard":"nep171",
      "version":"1.0.0",
      "event":"unassign_checklist",
      "data":{
        "creatorAccount":"${creator_account_id}",
        "checklistId":"${checklist_id}",
        "time":"${near.blockTimestamp()}",
      }}}`)
  }
}