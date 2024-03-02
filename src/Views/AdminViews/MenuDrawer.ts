export function getMenu(highlight:string)
    {
        return  ([
            
            {
              icon: 'account_balance',
              name: 'Academic',
              url: '/admin/academic',
              current: false,
              below: false,
            },
            {
              icon: 'account_balance',
              name: 'Timetable',
              url: '/admin/timetable',
              current: false,
              below: false,
            },
            {
              icon: 'school',
              name: 'Majors',
              url: '/admin/major',
              current: false,
              below: false,
            },
            {
              icon: 'business',
              name: 'Units',
              url: '/admin/unit',
              current: false,
              below: false,
            },
           
            {
              icon: 'supervisor_account',
              name: 'Account',
              url: '/admin/user',
              current: false,
              below: false,
            },
          ] ).map(x=>{
            if(x.name === highlight)
            {
                x.current= true;
                return x;
            }
            return x;
          });
    }
