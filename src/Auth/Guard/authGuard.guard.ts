import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  
  // Injection de la dépendance de la class Router
  // Comme nous sommes dans une fonction et non une class nous n'avons accès à un constructeur
  // Donc il faut utiliser le méthode inject d'Angular
  // Au lieu donc de faire --> constructor(private _router: Router) {}

  const router = inject(Router);

  const Role = localStorage.getItem("Role");

  // Si le token existe, la condition return true
  if (Role == "admin") {
    // Le guard return true ce qui veut dire que l'on autorise l'utilisateur à accèder à la route
    return true;
  } else {
    // Redirection de l'utilisateur vers un endroit ou il peut obtenir l'autorisation nécessaire pour accèder à la route.
    // Ou pas, certaines routes peuvent ne pas être accessible à l'utilisateur selon ses credentials
    router.navigate([''])
    return false;
  }

};