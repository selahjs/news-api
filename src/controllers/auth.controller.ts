import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { SignupSchema } from '../utils/validators';
import { sendResponse } from '../utils/response';

export const signup = async (req: Request, res: Response) => {
  try {
    const validatedData = SignupSchema.parse(req.body);
    const user = await AuthService.signup(validatedData);
    return sendResponse(res, 201, { success: true, message: "User created", object: user });
  } catch (error: any) {
    if (error.code === 'P2002') { // Prisma unique constraint error
      return sendResponse(res, 409, { success: false, message: "Conflict", errors: ["Email already exists"] });
    }
    return sendResponse(res, 400, { success: false, message: "Validation failed", errors: [error.message] });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);
    return sendResponse(res, 200, { success: true, message: "Login successful", object: result });
  } catch (error: any) {
    return sendResponse(res, 401, { success: false, message: "Unauthorized", errors: [error.message] });
  }
};