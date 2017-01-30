#!/bin/sh
cd app
ng build --base-href './'
cd ..
electron .
