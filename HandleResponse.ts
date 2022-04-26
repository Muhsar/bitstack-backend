export const HandleResponse = (
    res,
    status,
    msg,
    type,
    data,
) => res.status(status).json({
    message: {
        type, msg
    },
    data
})