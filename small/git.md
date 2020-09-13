### [git语法](https://juejin.im/post/6869519303864123399)
> 时间：2020-09-13

##### 基本语法
* 创建git仓库 git init
* 查看文件的状态 git status
  + Changes not staged for commit
    * 表示工作区有内容，但是缓存区没有内容，需要使用git add(git add * )
  + Changes to be committed
    * 一般而言，文件存在缓存区了，需要添加到本地仓库使用 git commit(git commit -m 说明)
  + nothing to commit, working tree clean
    * 这时候，就可以将我们本地的代码推送到远程仓库即可(git push origin master)

>以下这些语法我使用的比较少

* 列出当前配置 git config --list
* 列出Repository配置 git config --local --list
* 列出全局配置 git config --global --list
* 列出系统配置 git config --system --list
* 配置用户名 git config --global user.name "your name"
* 配置用户邮箱 git config --global user.email "youremail@github.com"

##### 分支管理
* 查看本地分支 git branch
* 查看远程分支 git branch -r
* 查看本地分支和远程分支 git branch -a
* 创建并切换新分支 git checkout -b <branch-name>
* 从当前分支切换到其他分支 git checkout <branch-name>
* 删除分支 git branch -d <branch-name>
* 当前分支与指定分支合并 git merge <branch-name>
* 查看哪些分支已经合并到当前分支 git branch --merged
* 查看那些分支没有合并到当前分支 git branch --no-merged
* 查看各个分支最后一个提交对象的信息 git branch -v
* 删除远程分支 git push origin -d <branch-name>
* 重命名分支 git branch -m <oldbranch-name><newbranch-name>
* 拉取远程分支并创建本地分支 git checkout -b 本地分支名x origin/远程分支名x
* 另一种方式也可以完成这个操作 git fetch origin <branch-name>:<local-branch-name>

###### fetch指令
fetch推荐写法
```
git fetch origin <branch-name>:<local-branch-name>
```
* 一般而言，这个origin是远程主机名，一般默认是origin
* branch-name要拉取的分支
* local-branch-name这个是本地新建的一个分支，将origin下的某个分支代码下载到本地分支
fetch其他写法
* 将某个远程主机的更新，全部拉回本地 git fetch<远程主机名>
* 拉取特定分支，可以指定分支名 git fetch<远程主机><分支名>
* 将某个分支的内容拉回到本地某个分支
  + git fetch origin :<local-branch-name> 等价于
  + git fetch origin master:<local-branch-name>

##### 撤销
* 撤销工作区修改 git checkout --
hello
***********************************





























1
