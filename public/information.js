import navbar from './navbar.js'
import { render } from './utils.js'

export const information = () => {
  render(
  `${navbar}
    <div class="container mt-4">
      <section class="jumbotron text-center">
        <h1 class="jumbotron-heading">A propos</h1>
        <p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>
        <a class="btn btn-primary btn-lg" href="/" role="button">Accueil»</a>
      </section>
    </div>
    `
  )
}

export default information