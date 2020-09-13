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
* 撤销工作区修改 git checkout --(不太理解？？？)
* 暂存区文件撤销(不覆盖工作区) git reset HEAD
* 版本回退 git reset --(solt|mixed|hard)<HEAD ~(num)> |
  * --hard 回退全部，包括HEAD, index, working tree
  * --mixed 回退部分，包括HEAD, index
  * 只回退HEAD

##### 状态查询
* 查看状态 git status
* 查看历史操作记录 git reflog
* 查看日志 git log

##### 文档查询
* 展示Git命令大纲 git help(--help)
* 展示Git命令大纲全部列表 git help -a
* 展示具体命令说明手册 git help

##### 文件暂存
* 添加改动到stash git stash save -a "message"
* 删除暂存 git stash drop stash@{ID}
* 恢复改动 git stash pop stash@{ID}

##### 差异比较
* 比较工作区与缓存区 git diff
* 比较缓存区域本地仓库最后一个commit内容 git diff --cached
* 比较工作区与本地最近一次commit内容 git diff HEAD
* 比较两个commit直接差异

##### 分支命名
* master分支
  * 主分支，用于部署生产环节的分支，确保稳定性
  * master分支一般由develop以及hotfix分支合并，任何情况下都不能直接修改代码
* develop分支
 * develop为开发分支，通常情况下，保存最新完成以及bug修复后的代码
 * 开发新功能时，feature分支都是基于develop分支下创建的。
* feature分支
 * 开发新功能，基本上以develop为基础创建feature分支
 * 分支命名：feature/开头的为特性分支，命名规则：feature/user_module、feature/car_module。
* release分支
 * release为预上线分支，发布提测阶段，会release分支代码为基准提测
* hotfix分支
 * 分支命名：hotfix/开头的为修复分支，它的命名规则与feature分支类似
 * 线上出现紧急问题是，需要及时修复，以master分支为基线，创建hotfix分支，修复完成以后，需要合并到master分支和develop分支。

##### 基本操作
看看整体的操作流程
* 创建本地仓库 git init
* 链接本地仓库与远端仓库 git remote add origin(origin默认是远端仓库别名，url可以使用https或者ssh的方式新建)
* 检查配置信息 git config --list
* Git user name 与 email
  * git config --global user.name "yourname"
  * git config --global user.email "your_email"
* 生成SSH密钥
  * ssh-keygen -t rsa -C "这里换上我们的邮箱"
  * cd ~/.ssh 里面有个文件名为id_rsa.pub把里面的内容复制到git库的我的SSHKEYs中
* 查看远端仓库信息 git remote -v
* 远端仓库重新命名 gitremote rename old new
* 提交到缓存区
  * git add . 全部上传到缓存区
  * git add 指定文件
* 提交到本地仓库
  * git commit -m "some message"
* 提交到远程仓库 git push<远程主机名><本地分支名>:<远程分支名>
* 查看分支 git branch
* 创建新分支 git branch <分支名>
* 切换分支 git checkout
* 创建并切换 git checkout -b
* 删除分支 git branch -d
* 删除远程分支 git push -d
* 切换分支 git checkout

##### 忽略文件.gitignore
这个文件的作用，会忽略一些需要纳入Git管理这种，我们不希望出现在未跟踪文件列表。
看看配置信息
```
# 此行为注释，会被Git忽略
# 忽略node_modules/目录下的所有文件
node_modules
# 忽略所有.vscode结束的文件
.vscode
# 忽略所有.md结尾的文件
*.md
#但README.md除外
!README.md
# 胡忽略doc/something.txt但不会忽略doc/images/arch.txt
doc/*.txt
# 忽略doc/目录下所有扩展名为txt文件
doc/**/*.txt
```
