public with sharing class EngagementController
{
    @AuraEnabled(cacheable=true)
    public static Map<String, Integer> getActivityCounts(Id engagementId)
    {
        Integer taskCount = [
            SELECT count()
            FROM Task
            WHERE WhatId = :engagementId
            AND Status = 'Completed'
        ];
        Integer eventCount = [
            SELECT count()
            FROM Event
            WHERE WhatId = :engagementId
            AND StartDateTime >= :Datetime.now()
        ];

        Map<String, Integer> counts = new Map<String, Integer>();
        counts.put('tasks', taskCount);
        counts.put('events', taskCount);

        return counts;
    }

    @AuraEnabled
    public static void createFollowUpCall(Id engagementId, String engagementName)
    {
        try {
            Task newTask = new Task(
                Subject = 'Follow-up on ' + engagementName,
                Type = 'Call',
                ActivityDate = Date.today().addDays(1),
                WhatId = engagementId,
                Status = 'Not Started'
            );

            insert newTask;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    // @AuraEnabled(cacheable=true)
    // public static string getEngagementId(Id engagementId){
    //     return 'Tío esta es la versión del engagement tío ' + engagementId;
    // }
}
