import { serverConfig } from "./config";
import buildApp from "./app";

process.env.TZ = serverConfig.timezone;

function logError(error: Error) {
    console.error({
        message: error?.message,
        stack: error?.stack,
        meta: { name: error?.name },
    });
    process.exit(1);
}

const init = async () => {
    const app = buildApp();

    const port = serverConfig.port;

    app.listen(port, "::", () => {
        if (process.env.NODE_ENV !== "production") {
            console.log(`API http server running on port ${port}`);
        }
    });
};

init().catch((e: Error) => {
    logError(e);
});
