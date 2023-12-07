# otclient-font-create-tool

Application for creating fonts for OTClient

## Application link

[https://egzot.github.io/otclient-font-create-tool/](https://egzot.github.io/otclient-font-create-tool/)

## Instruction how to generate font and otfont files

* Add font to application [example noto fonts](https://fonts.google.com/noto)

* Choose one of the added font

* Add **font size**, **sign width**, **sign height** and other

* Download font image

* Download otfont file

## Add new font to OTClient

1) Put generated .png and .otfont font files to folder:

```
../OTClient/data/fonts/
```

2) Add added font to otui component:

Example:

```
ModuleListLabel < Label
  font: FONT_NAME
  background-color: alpha
  text-offset: 2 0
  focusable: true
  color: #cccccc
```

Value font based on otfont name value:

```
Font
  name: FONT_NAME
  texture: some_texture
  height: 15
  glyph-size: 16 16
  space-width: 3
```

## Examples fonts

* [Noto fonts](https://fonts.google.com/noto)

## Get repository

```
git clone --recursive <url>
```

# Compose

## Start compose

```sh
sudo docker compose up
```

## Stop compose

```sh
sudo docker compose down
```

## Install new npm package

```sh
sudo docker exec -it otclient-font-create-tool-otclient-font-create-tool-1 bash
cd otclient-font-create-tool
npm i <package_name>
```

## Uninstall npm package

```sh
sudo docker exec -it otclient-font-create-tool-otclient-font-create-tool-1 bash
cd otclient-font-create-tool
npm uninstall <package_name>
```

## Restart compose

```sh
sudo docker compose restart
```
