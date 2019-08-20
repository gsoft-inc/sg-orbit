# @orbit-ui/tachyons

Tachyons CSS customized for Sharegate Design Guidelines. The main differentiators being that you can easily override the default values of Tachyons by importing CSS "config" files and a spacing scale based on 10. 

CSS Variables are not compiled by default, in order to do so please check the package.json file.
(Changer ça pour expliquer qu'on a différent fichier, dont un pas compilé)

## Getting started

Docs can be found at [Tachyons](http://tachyons.io/docs)
The modules are generally pretty small and thus quick and easy to read. Since this is a fork of Tachyons in some instances the official doc is not exactly the truth, please for the time being open the src css files when in doubt.

## Configuration

If you want to override the default variables specified in `tachyons-sg` (for instance, changing the color of the `--primary` variable), simply redeclare the variables in a `:root` css class.

``` css
:root {
    --primary: #c63a0c;
}
```

## License

Copyright © 2019, Groupe Sharegate inc. This code is licensed under the Apache License, Version 2.0. You may obtain a copy of this license at https://github.com/gsoft-inc/gsoft-license/blob/master/LICENSE.
