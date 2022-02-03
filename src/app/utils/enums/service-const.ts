export const serviceTrackStatus = {
    received: 1,
    resolved: 2,
    reject: 3,
    assigned: 4,
    pickUpInProgress: 5,
    pickUpToServiceStation: 6,
    serviceInStation: 7,
    outForDelivery: 8,
    delivered: 9,
    completed: 10,
    oeAssigned: 1,
    oeReject: 3,
};

export const serviceListStatus = [{
    name: 'Received',
    val: serviceTrackStatus.received,
    tableHeaders: [{
        name: 'Ticket Number'
    },
    {
        name: 'Item Name'
    },
    {
        name: 'Customer Name'
    },
    {
        name: 'Customer Village'
    },
    {
        name: 'Remarks'
    },
    {
        name: 'Assigned OE'
    },
    {
        name: 'Estimate'
    },
    {
        name: 'Received Date'
    },
    {
        name: 'OE Assigned Date'
    },
    {
        name: 'Rejected Date'
    },
    {
        name: 'Service Date'
    },
    // {
    //     name: 'Remarks'
    // },
    {
        name: 'Other Remarks'
    },
    {
        name: 'Customer Mobile'
    },
    {
        name: 'VLE Name'
    },
    {
        name: 'VLE Code'
    },
    {
        name: 'Demo'
    },
    {
        name: 'In Warranty'
    },
    ]
},
{
    name: 'Request Assigned',
    val: serviceTrackStatus.assigned,
    tableHeaders: []
},
{
    name: 'Pick Up',
    val: null,
    tableHeaders: []
},
{
    name: 'In Service Station',
    val: serviceTrackStatus.serviceInStation,
    tableHeaders: [{
        name: 'Ticket Number'
    },
    {
        name: 'Item Name'
    },
    {
        name: 'Customer Name'
    },
    {
        name: 'Customer Village'
    },
    {
        name: 'Complaint Actions'
    },
    {
        name: 'Assigned OE'
    },
    {
        name: 'Estimate'
    },
    {
        name: 'Received Date'
    },
    {
        name: 'OE Assigned Date'
    },
    {
        name: 'Rejected Date'
    },
    {
        name: 'Service Date'
    },
    {
        name: 'Remarks'
    },
    {
        name: 'Other Remarks'
    },
    {
        name: 'Customer Mobile'
    },
    {
        name: 'VLE Name'
    },
    {
        name: 'VLE Code'
    },
    ]
},
{
    name: 'Out For  Delivery',
    val: serviceTrackStatus.outForDelivery,
    tableHeaders: [{
        name: 'Ticket Number'
    },
    {
        name: 'Item Name'
    },
    {
        name: 'Customer Name'
    },
    {
        name: 'Customer Village'
    },
    {
        name: 'Complaint Actions'
    },
    {
        name: 'Assigned OE'
    },
    {
        name: 'Estimate'
    },
    {
        name: 'Received Date'
    },
    {
        name: 'OE Assigned Date'
    },
    {
        name: 'Rejected Date'
    },
    {
        name: 'Service Date'
    },
    {
        name: 'Remarks'
    },
    {
        name: 'Other Remarks'
    },
    {
        name: 'Customer Mobile'
    },
    {
        name: 'VLE Name'
    },
    {
        name: 'VLE Code'
    },
    ]
},
{
    name: 'Resolved',
    val: serviceTrackStatus.delivered,
    tableHeaders: [{
        name: 'Ticket Number'
    },
    {
        name: 'Item Name'
    },
    {
        name: 'Customer Name'
    },
    {
        name: 'Customer Village'
    },
    {
        name: 'Complaint Actions'
    },
    {
        name: 'Assigned OE'
    },
    {
        name: 'Estimate'
    },
    {
        name: 'Received Date'
    },
    {
        name: 'OE Assigned Date'
    },
    {
        name: 'Rejected Date'
    },
    {
        name: 'Service Date'
    },
    {
        name: 'Remarks'
    },
    {
        name: 'Other Remarks'
    },
    {
        name: 'Customer Mobile'
    },
    {
        name: 'VLE Name'
    },
    {
        name: 'VLE Code'
    },
    {
        name: 'Total Cost'
    },
    ]
},
{
    name: 'Completed',
    val: serviceTrackStatus.completed,
    tableHeaders: [{
        name: 'Ticket Number'
    },
    {
        name: 'Item Name'
    },
    {
        name: 'Customer Name'
    },
    {
        name: 'Customer Village'
    },
    {
        name: 'Complaint Actions'
    },
    {
        name: 'Assigned OE'
    },
    {
        name: 'Estimate'
    },
    {
        name: 'Received Date'
    },
    {
        name: 'OE Assigned Date'
    },
    {
        name: 'Rejected Date'
    },
    {
        name: 'Service Date'
    },
    {
        name: 'Remarks'
    },
    {
        name: 'Other Remarks'
    },
    {
        name: 'Customer Mobile'
    },
    {
        name: 'VLE Name'
    },
    {
        name: 'VLE Code'
    },
    {
        name: 'Total Cost'
    },
    ]
},

{
    name: 'Resolved on Phone',
    val: serviceTrackStatus.resolved,
    tableHeaders: [{
        name: 'Ticket Number'
    },
    {
        name: 'Item Name'
    },
    {
        name: 'Customer Name'
    },
    {
        name: 'Customer Village'
    },
    {
        name: 'Complaint Actions'
    },
    {
        name: 'Assigned OE'
    },
    {
        name: 'Estimate'
    },
    {
        name: 'Received Date'
    },
    {
        name: 'OE Assigned Date'
    },
    {
        name: 'Rejected Date'
    },
    {
        name: 'Service Date'
    },
    {
        name: 'Remarks'
    },
    {
        name: 'Other Remarks'
    },
    {
        name: 'Customer Mobile'
    },
    {
        name: 'VLE Name'
    },
    {
        name: 'VLE Code'
    },
    ]
},
{
    name: 'Rejected',
    val: serviceTrackStatus.reject,
    tableHeaders: [{
        name: 'Ticket Number'
    },
    {
        name: 'Item Name'
    },
    {
        name: 'Customer Name'
    },
    {
        name: 'Customer Village'
    },
    {
        name: 'Complaint Actions'
    },
    {
        name: 'Assigned OE'
    },
    {
        name: 'Estimate'
    },
    {
        name: 'Received Date'
    },
    {
        name: 'OE Assigned Date'
    },
    {
        name: 'Rejected Date'
    },
    {
        name: 'Service Date'
    },
    {
        name: 'Remarks'
    },
    {
        name: 'Other Remarks'
    },
    {
        name: 'Customer Mobile'
    },
    {
        name: 'VLE Name'
    },
    {
        name: 'VLE Code'
    },
    ]
}
];

export const assignSubTabStatus = [
    {
        name: 'Request Assigned',
        val: serviceTrackStatus.oeAssigned,
        subName: 'Assigned',
        tableHeaders: [{
            name: 'Ticket Number'
        },
        {
            name: 'Item Name'
        },
        {
            name: 'Customer Name'
        },
        {
            name: 'Customer Village'
        },
        {
            name: 'Complaint Actions'
        },
        {
            name: 'Assigned OE'
        },
        {
            name: 'Estimate'
        },
        {
            name: 'Received Date'
        },
        {
            name: 'OE Assigned Date'
        },
        {
            name: 'Rejected Date'
        },
        {
            name: 'Service Date'
        },
        {
            name: 'Remarks'
        },
        {
            name: 'Other Remarks'
        },
        {
            name: 'Customer Mobile'
        },
        {
            name: 'VLE Name'
        },
        {
            name: 'VLE Code'
        },
        ]
    },
    {
        name: 'Request Assigned',
        val: serviceTrackStatus.oeReject,
        subName: 'Reject',
        tableHeaders: [{
            name: 'Ticket Number'
        },
        {
            name: 'Item Name'
        },
        {
            name: 'Customer Name'
        },
        {
            name: 'Customer Village'
        },
        {
            name: 'Complaint Actions'
        },
        {
            name: 'Assigned OE'
        },
        {
            name: 'Estimate'
        },
        {
            name: 'Received Date'
        },
        {
            name: 'OE Assigned Date'
        },
        {
            name: 'Rejected Date'
        },
        {
            name: 'Service Date'
        },
        {
            name: 'Remarks'
        },
        {
            name: 'Other Remarks'
        },
        {
            name: 'Customer Mobile'
        },
        {
            name: 'VLE Name'
        },
        {
            name: 'VLE Code'
        },
        ]
    }];
export const pickUpSubTabStatus = [
    {
        name: 'Pick Up',
        val: serviceTrackStatus.pickUpInProgress,
        subName: 'In Progress',
        tableHeaders: [{
            name: 'Ticket Number'
        },
        {
            name: 'Item Name'
        },
        {
            name: 'Customer Name'
        },
        {
            name: 'Customer Village'
        },
        {
            name: 'Complaint Actions'
        },
        {
            name: 'Assigned OE'
        },
        {
            name: 'Estimate'
        },
        {
            name: 'Received Date'
        },
        {
            name: 'OE Assigned Date'
        },
        {
            name: 'Rejected Date'
        },
        {
            name: 'Service Date'
        },
        {
            name: 'Remarks'
        },
        {
            name: 'Other Remarks'
        },
        {
            name: 'Customer Mobile'
        },
        {
            name: 'VLE Name'
        },
        {
            name: 'VLE Code'
        },
        ]
    },
    {
        name: 'Pick Up',
        val: serviceTrackStatus.pickUpToServiceStation,
        subName: 'To Service Station',
        tableHeaders: [{
            name: 'Ticket Number'
        },
        {
            name: 'Item Name'
        },
        {
            name: 'Customer Name'
        },
        {
            name: 'Customer Village'
        },
        {
            name: 'Complaint Actions'
        },
        {
            name: 'Assigned OE'
        },
        {
            name: 'Estimate'
        },
        {
            name: 'Received Date'
        },
        {
            name: 'OE Assigned Date'
        },
        {
            name: 'Rejected Date'
        },
        {
            name: 'Service Date'
        },
        {
            name: 'Remarks'
        },
        {
            name: 'Other Remarks'
        },
        {
            name: 'Customer Mobile'
        },
        {
            name: 'VLE Name'
        },
        {
            name: 'VLE Code'
        },
        ]
    }
];
export const serviceResolveType = {
    notResolved: 1,
    resolvedOnRemote: 2,
};
export const serviceRejectionType = {
    rejectOnCash: 1
};
export const serviceRemarksType = [
    {
        name: 'RESOLVED_ON_REMOTE',
        val: 1
    }
];


