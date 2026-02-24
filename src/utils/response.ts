export const sendResponse = (res: any, status: number, data: {
  success: boolean;
  message: string;
  object?: any;
  errors?: string[] | null;
}) => {
  return res.status(status).json({
    Success: data.success,
    Message: data.message,
    Object: data.object || null,
    Errors: data.errors || null
  });
};