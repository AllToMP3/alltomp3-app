rm -rf dist/
mkdir dist
ng build --aot --output-path dist/en --base-href './'
ng build --aot --output-path dist/fr --locale fr --i18n-format xlf --i18n-file src/locale/messages.fr.xlf --base-href './'
ng build --aot --output-path dist/fi --locale fi --i18n-format xlf --i18n-file src/locale/messages.fi.xlf --base-href './'
ng build --aot --output-path dist/tr --locale tr --i18n-format xlf --i18n-file src/locale/messages.tr.xlf --base-href './'
ng build --aot --output-path dist/ja --locale ja --i18n-format xlf --i18n-file src/locale/messages.ja.xlf --base-href './'
ng build --aot --output-path dist/es --locale es --i18n-format xlf --i18n-file src/locale/messages.es.xlf --base-href './'
ng build --aot --output-path dist/pt --locale pt --i18n-format xlf --i18n-file src/locale/messages.pt.xlf --base-href './'
ng build --aot --output-path dist/de --locale de --i18n-format xlf --i18n-file src/locale/messages.de.xlf --base-href './'
ng build --aot --output-path dist/ar --locale ar --i18n-format xlf --i18n-file src/locale/messages.ar.xlf --base-href './'
ng build --aot --output-path dist/it --locale it --i18n-format xlf --i18n-file src/locale/messages.it.xlf --base-href './'
