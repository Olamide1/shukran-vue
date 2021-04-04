# https://dev.to/sauravjaiswalsj/automating-git-push-with-just-a-single-bash-command-460n

echo "moving to master branch"
git checkout master
echo "merging master branch with new-face branch"
git merge new-face
echo "pushing new merged changes in master branch"
git push
echo "going back to new-face branch"
git checkout new-face