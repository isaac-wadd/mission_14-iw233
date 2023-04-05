function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 56771;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 56771 > /dev/null;
done;

for child in $(list_child_processes 56781);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/isaac.wadd/Downloads/Winter 2023/Enterprise_Dev/mission_14-iw233/back/bin/Debug/net6.0/361c5c68bd6042a7a04ae0ec2949bd2c.sh;
