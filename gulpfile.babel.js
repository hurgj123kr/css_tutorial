import gulp from "gulp";
import del from "del";
import minify from "gulp-csso";
import autoprefixer from "gulp-autoprefixer";
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

const routes = {
  css: {
    watch: "src/scss/*",
    src: "src/scss/styles.scss",
    dest: "dist/css"
  }
};

const styles = () => {
  return gulp
  .src(routes.css.src)
  .pipe(
    autoprefixer({
      flexbox: true,
      grid: "autoplace"
    })
  )
  .pipe(minify())
  .pipe(gulp.dest(routes.css.dest));
}


const watch = () => {
  gulp.watch(routes.css.watch, styles);
};

const clean = () => del(["dist/styles.css"]);

const prepare = gulp.series([clean]);

const assets = gulp.series([styles]);

const live = gulp.parallel([watch]);

export const dev = gulp.series([prepare, assets, live]);
