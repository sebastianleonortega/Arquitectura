import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private renderer: Renderer2;

  public loading$ = new BehaviorSubject<boolean>(false);

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public show(): void {
    this.renderer.addClass(document.body, 'no-scroll');
    this.renderer.addClass(document.documentElement, 'no-scroll');
    this.loading$.next(true);
  }

  public hide(): void {
      this.renderer.removeClass(document.body, 'no-scroll');
      this.renderer.removeClass(document.documentElement, 'no-scroll');
      this.loading$.next(false)
  }

}

