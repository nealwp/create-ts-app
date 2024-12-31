import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

const middleware = [express.json(), express.urlencoded({ extended: true }), helmet(), cors(), compression()];

export { middleware };
