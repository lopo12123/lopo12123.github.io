type NavItem = {
    title: string
    path: string
}

const navItems: NavItem[] = [
    { title: 'Essay', path: '/essay' },
    { title: 'Project', path: '/project' },
    { title: 'Photo', path: '/photo' },
    // { title: 'Annual', path: '/annual' },
    { title: 'About', path: '/about' },
]

export {
    navItems
}