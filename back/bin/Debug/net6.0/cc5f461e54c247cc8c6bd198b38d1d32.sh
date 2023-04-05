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

ps 58747;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 58747 > /dev/null;
done;

for child in $(list_child_processes 58796);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/isaac.wadd/Downloads/Winter 2023/Enterprise_Dev/mission_14-iw233/back/bin/Debug/net6.0/cc5f461e54c247cc8c6bd198b38d1d32.sh;
