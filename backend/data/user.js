import bcrypt from "bcryptjs";

const users = [
    {
        name : 'Admin User',
        email : 'adminuser@gmail.com',
        password : bcrypt.hashSync('123456',10),
        isAdmin :true
    },
    {
        name : 'Jhon Doe',
        email : 'jhondoe@gmail.com',
        password : bcrypt.hashSync('123456',10),
        isAdmin : false
    },
    {
        name : 'Sasa ji',
        email : 'sasaji@gmail.com',
        password : bcrypt.hashSync('123456',10),
        isAdmin :false
    }
]

export default users