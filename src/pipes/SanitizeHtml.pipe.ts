import {PipeTransform, Pipe} from "@angular/core";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Pipe({
  name: "sanitizeHtml"
})
export class SanitizeHtml implements PipeTransform {

  constructor(public sanitizer: DomSanitizer) {
  }

  transform(v: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(v);
  }
}
