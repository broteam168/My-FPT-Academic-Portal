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
              icon: 'widgets',
              name: 'Academic',
              url: '/admin/semester',
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
              icon: 'home',
              name: 'Semester',
              url: '/',
              current: false,
              below: false,
            },
            {
              icon: 'home',
              name: 'News',
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
