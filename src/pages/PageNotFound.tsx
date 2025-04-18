import Button from '../components/Button';
import styles from './PageNotFound.module.scss';
export default function PageNotFound(){
  return (
    <div className={styles['not_found']}>
      <h1>Page Not Found!</h1>
      <p>It seems that the page you are looking for does not exist</p>
      <Button
        text="Go Back Home"
        navigateTo="/"
      />
    </div>
  )
}