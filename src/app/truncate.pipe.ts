import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name:'truncate'
})

export class TruncatePipe implements PipeTransform {
    transform(value: string, limit: number) {
        if(value.length>limit)
            return value.substr(0,limit-3);
        else
            return value;
    }
}