import { LightningElement, api, wire } from "lwc"
import { getRecord, getFieldValue } from "lightning/uiRecordApi"
import { ShowToastEvent } from "lightning/platformShowToastEvent"
import { refreshApex } from "@salesforce/apex"

import getActivityCounts from "@salesforce/apex/EngagementController.getActivityCounts"
import createFollowUpCall from "@salesforce/apex/EngagementController.createFollowUpCall"
// import getEngagementId from "@salesforce/apex/EngagementController.getEngagementId"

import NAME_FIELD from "@salesforce/schema/Engagement__c.Name"
import OPP_AMOUNT_FIELD from "@salesforce/schema/Engagement__c.Related_Opportunity__r.Amount"

export default class EngagementSummary extends LightningElement {
  @api recordId
  wiredActivitiesResult

  @wire(getRecord, { recordId: "$recordId", fields: [NAME_FIELD, OPP_AMOUNT_FIELD] })
  engagement

  @wire(getActivityCounts, { engagementId: "$recordId" })
  getCounters(result) {
    this.wiredActivitiesResult = result
  }

  // @wire(getEngagementId, { engagementId: "$recordId" })
  // theEngagementId

  get name() { return getFieldValue(this.engagement.data, NAME_FIELD); }
  get oppAmount() { return getFieldValue(this.engagement.data, OPP_AMOUNT_FIELD) || 0 }
  get completedTasks() { return this.wiredActivitiesResult.data ? this.wiredActivitiesResult.data.tasks : 0 }
  get upcomingEvents() { return this.wiredActivitiesResult.data ? this.wiredActivitiesResult.data.events : 0 }
  // get tomaEngagementeId() { return this.theEngagementId }

  async handleFollowUp() {
    try {
      await createFollowUpCall({
        engagementId: this.recordId,
        engagementName: this.name
      })

      this.dispatchEvent(new ShowToastEvent({
        title: "Success",
        message: "Follow-up call created for tomorrow",
        variant: "success"
      }))
      await refreshApex(this.wiredActivitiesResult)
    } catch (error) {
      console.error(error)
    }
  }
}
