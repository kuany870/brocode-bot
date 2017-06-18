const gulp = require('gulp')
const {spawn} = require('child_process')
const runSequence = require('run-sequence')
const standard = require('gulp-standard')

const jsFiles = [
  'src/**/*.js',
  'test/**/*.js',
  '*.js'
]

gulp.task('standard', () => gulp.src(jsFiles)
  .pipe(standard())
  .pipe(standard.reporter('default', {breakOnError: true, quiet: true}))
)

gulp.on('stop', () => process.nextTick(() => process.exit(0)))

gulp.task('mochaAndIstanbul', done => spawn('yarn', ['nyc'], {stdio: 'inherit'})
  .on('close', code => done(code)))

gulp.task('default', done => {
  runSequence(
    'standard',
    'mochaAndIstanbul',
    done)
})
