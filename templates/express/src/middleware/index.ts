import cors from "cors";
import helmet from "helmet";
import compression from "compression";

const middleware = [helmet(), cors(), compression()];

export { middleware };
