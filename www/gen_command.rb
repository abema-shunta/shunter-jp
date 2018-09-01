command_file = open "ftp.command", "w"

list = []

def add_list(list,cd) 

	all = Dir.glob("#{cd}/*")
	files = Dir.glob("#{cd}/*.*")
	list += files 
	dirs = all-files

	if dirs.size != 0
		dirs.each {|dir|
			ncd = "#{dir}"
			list += add_list([], ncd)
		}
	end
	list
end

command_file.puts("open shunter.sakura.ne.jp
user shunter jimbo12-
bin
prompt
lpwd
pwd
#{add_list(list,"./www").map{|s| "put #{s}"}.join("\n")}
bye
")

command_file.close