module.exports = {
  'noSuperfluousTags':[
    { line: 7,
      message: 'Tag(s) duplicated on a Feature and a Scenario in that Feature: @superfluoustag1',
      rule: 'no-superfluous-tags'
    },
    { line: 11,
      message: 'Tag(s) duplicated on a Feature and a Scenario in that Feature: @superfluoustag1, @superfluoustag2',
      rule: 'no-superfluous-tags'
    }
  ]
};
