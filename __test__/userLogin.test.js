// Test login
const {login} = require('../controller/authController');
const { loginUser } = require('../service/index');
jest.mock('../service/index'); 
const testingData = [
    { input: {body: { email: "a@a.com", password: "1234" } }, output:{
            user: {
                email: 'a@a.com',
                subscription: 'starter',
            },
            token: 'mockedtoken',
    }
    },
    { input:{ body: { email: "test@example.com", password: "1234" } }, output:{
            user: {
                email: 'test@example.com',
                subscription: 'business',
            },
            token: 'mockedtoken',
    }
    },  
]
describe('login contrloller', () => {
    test('should respond with a user object and token on successful login', async() => {
     for (const item of testingData) {
         const req = item.input;
          const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
         const successfulLoginData = item.output;
         loginUser.mockResolvedValue(successfulLoginData);
         await login(req, res);
         expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(item.output);
    }   
    })
    
})