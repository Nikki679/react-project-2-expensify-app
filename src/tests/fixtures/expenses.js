import moment from 'moment';
export default [{
    id:1,
    description:'rent',
    note:"oct rent",
    amount:1905,
    createdAt:0
},
{
    id:2,
    description:'rent',
    note:"nov rent",
    amount:14905,
    createdAt:moment(0).subtract(4,'days').valueOf()
},
{
    id:3,
    description:'bill',
    note:"dec rent",
    amount:1087,
    createdAt:moment(0).add(4,'days').valueOf()
},
];