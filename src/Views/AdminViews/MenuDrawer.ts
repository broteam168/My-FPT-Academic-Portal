export function getMenu(highlight:string)
    {
        return  ([
            {
              icon: 'computer',
              name: 'Dashboard',
              url: '/',
              current: false,
              below: false,
            },
            {
              icon: 'account_balance',
              name: 'Academic',
              url: '/admin/academic',
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
              icon: 'home',
              name: 'News2',
              url: '/',
              current: false,
              below: true,
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
