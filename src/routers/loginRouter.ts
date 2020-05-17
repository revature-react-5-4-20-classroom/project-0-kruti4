import express,{Request,Response,NextFunction} from "express";
import { Router } from "express";
import { findUserByUsernamePassword } from "../repository/userData";
export const loginRouter:Router =express.Router();
loginRouter.post('/', async (req: Request, res: Response) => {
    // We're assuming users login with username and password inside a JSON object
    // get that data:
    const {username, password} = req.body;
    if( !username || !password) {
      res.status(400).send('Please include username and password fields for login');
    } else {
      try {
        const user = await findUserByUsernamePassword(username, password);
        if(req.session) {
          req.session.user = user;
        }
        //send the user back, as a favor to our future selves
        res.json(user);
      } catch (e) {
        console.log(e.message);
        res.status(400).send('Invalid Credentials');
      }
    }
  });

//   loginRouter.post('/', (req: Request, res: Response) => {
//     const { userName, password } = req.body;
//     if (!userName || !password) {
//         res.status(400).send("enter username and password");
//     } else {
//         try {
//             const user = findUserByUsernamePassword(userName, password);
//             if (req.session) {
//                 req.session.user = user;
//             }
//             res.json(user);
//         }
//         catch (e) {
//             res.send(401).send("faild authentication");
//         }
//     }
// });
