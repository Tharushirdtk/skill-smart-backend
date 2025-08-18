const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const dataSource = require('./data-source');
const Employee = require('../shared/entities/Employee');

function initializePassport(passport) {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'secret123',
  };

  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const repo = dataSource.getRepository(Employee);
        const user = await repo.findOneBy({ id: jwt_payload.id });
        if (user) return done(null, user);
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    })
  );
}

module.exports = { initializePassport };