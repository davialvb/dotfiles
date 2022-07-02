#!/usr/bin/env bash
sudo pacman -Syu # Download & update mirrors
sudo pacman -S paru # Install Paru package manager
paru -S base-devel # Install base development packages, which are helpful for installing other packages
paru -S "$(cat packages_to_install | xargs)" # Install list of all packages
