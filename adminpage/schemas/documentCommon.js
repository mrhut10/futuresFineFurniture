export default {
  title: 'DocumentCommon',
  name: 'documentCommon',
  type: 'object',
  fields: [
    {
      title: 'Date Created',
      name: 'dateCreated',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Today'
      },
    },
    {
      title: 'Date Published',
      name: 'datePublished',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Today'
      },
    },
    {
      title: 'Date Updated',
      name: 'dateUpdated',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Today'
      },
    },
    {
      title: 'Date Disabled',
      name: 'dateDisabled',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Today'
      },
    }
  ]
};