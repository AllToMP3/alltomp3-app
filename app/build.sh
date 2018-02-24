rm -rf dist/
mkdir dist
ng build --aot --output-path dist/en --base-href './'
ng build --aot --output-path dist/fr --locale fr --i18n-format xlf --i18n-file src/locale/messages.fr.xlf --base-href './'
ng build --aot --output-path dist/ar --locale ar --i18n-format xlf --i18n-file src/locale/messages.ar.xlf --base-href './'
