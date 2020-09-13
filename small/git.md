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
*************************************************





























1
