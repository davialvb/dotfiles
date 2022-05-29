#!/usr/bin/env sh

# Terminate already running bar instances
killall -q polybar

# Wait until the processes have been shut down
while pgrep -x polybar >/dev/null; do sleep 1; done

# Launch bar1 and bar2
#polybar example &
#polybar -c ${HOME}/.config/polybar/config2 laptop &
#polybar -c ${HOME}/.config/polybar/config.ini centerLeft &
#polybar -c ${HOME}/.config/polybar/config.ini centerMiddle &
#polybar -c ${HOME}/.config/polybar/config.ini centerRight &
#polybar -c ${HOME}/.config/polybar/config.ini rightLeft &
#polybar -c ${HOME}/.config/polybar/config.ini rightRight &
#polybar -c ${HOME}/.config/polybar/config_3 title &
#polybar -c ${HOME}/.config/polybar/config_3 cpu &
#polybar -c ${HOME}/.config/polybar/config_3 memory & 
#polybar -c ${HOME}/.config/polybar/config_3 temperature &
#polybar -c ${HOME}/.config/polybar/config_3 workspace &
#polybar -c ${HOME}/.config/polybar/config_3 volume &
#polybar -c ${HOME}/.config/polybar/config_3 clock &
#polybar -c ${HOME}/.config/polybar/config_3 tray &

if type "xrandr"; then
  for m in $(xrandr --query | grep " connected" | cut -d" " -f1); do
    MONITOR=$m polybar --reload example &
  done
else
  polybar --reload example &
fi

echo "Bars launched..."
