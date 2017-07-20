import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private sub: Subscription;

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private router: Router
  ) { }

  ngOnInit() {
    this.setPageTitlesAndMeta();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

   /**
   * @param $event - component instance
   */
  onActivate($event) {
    console.log('Activated Component', $event);
  }

  onDeactivate($event) {
    console.log('Deactivated Component', $event);
  }

  private setPageTitlesAndMeta() {
    this.sub = this.router.events
      // NavigationStart, NavigationEnd, NavigationCancel,
      // NavigationError, RoutesRecognized
      // experimental: RouteConfigLoadStart, RouteConfigLoadEnd
      .filter(event => event instanceof NavigationEnd)

      // access to router state, we swap what we’re observing
      // better alternative to accessing the routerState.root directly,
      // is toinject the ActivatedRoute
      // .map(() => this.activatedRoute)
      .map(() => this.router.routerState.root)

      // we’ll create a while loop to traverse over the state tree
      // to find the last activated route,
      // and then return it to the stream
      // Doing this allows us to essentially dive into the children
      // property of the routes config
      // to fetch the corresponding page title(s)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .switchMap(route => route.data)
      .subscribe(
      data => {
        this.titleService.setTitle(data['title']);
        this.metaService.addTags(data['meta']);
      });
  }
}

