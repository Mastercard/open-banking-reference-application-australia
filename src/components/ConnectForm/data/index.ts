const data = {
    url: {
        generateAppToken: '/aggregation/v2/partners/authentication',
        activateCustomer: '/aggregation/v2/customers/testing',
        generateConnectUrl: '/connect/v2/generate',
        createConsumer: '/decisioning/v1/customers/<customerId>/consumer',
        refreshAccounts:
            '/aggregation/v1/customers/<customerId>/institutionLogins/<institutionLoginId>/accounts',
    },
    body: {
        createConsumer: JSON.stringify({
            firstName: 'John',
            lastName: 'Smith',
            address: '100 Arthur Street',
            city: 'Sydney',
            state: 'NSW',
            phone: '1234567890',
            ssn: '999601111',
            birthday: {
                year: 1989,
                month: 8,
                dayOfMonth: 13,
            },
            email: 'myname@mycompany.com',
            suffix: 'PhD',
        }),
        activateCustomer: JSON.stringify({
            firstName: 'John',
            lastName: 'Smith',
            email: `john_smith_${Date.now()}@domain.com`,
            phone: '6786786786',
        }),
    },
    fixedAccordions: ['panel0', 'panel1'],
    accordions: [
        {
            id: 'panel0',
            title: 'CREATE CUSTOMER',
            content: '',
            nextId: 'panel1',
        },
        {
            id: 'panel1',
            title: 'CONNECT BANK ACCOUNT',
            content: '',
            nextId: 'panel2',
        },
        {
            id: 'panel2',
            title: 'ACCOUNT INFORMATION',
            // content: '',
            nextId: 'panel3',
        },
        {
            id: 'panel3',
            title: 'USE CASES',
            content: '',
            nextId: 'panel4',
        },
    ],
};

export default data;
